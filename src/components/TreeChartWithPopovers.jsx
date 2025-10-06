import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import data from "../data/treeData.json"
import EnhancedPopover from "./EnhancedPopover"

const TreeChartWithPopovers = ({ onInteraction }) => {
  const svgRef = useRef()
  const containerRef = useRef()
  const [popover, setPopover] = useState({ visible: false, node: null, x: 0, y: 0 })
  const [firstTime, setFirstTime] = useState(true)
  const hoverTimeoutRef = useRef(null)

  useEffect(() => {
    const hasInteracted = localStorage.getItem('treeInteracted')
    if (hasInteracted === 'true') {
      setFirstTime(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2}, 100)`)

    const zoom = d3.zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
        setPopover({ visible: false, node: null, x: 0, y: 0 })
      })

    svg.call(zoom)

    const root = d3.hierarchy(data)
    root.x0 = 0
    root.y0 = 0

    if (root.children) root.children.forEach(collapse)

    const treeLayout = d3.tree().nodeSize([240, 300])

    function update(source) {
      const duration = 750
      const treeData = treeLayout(root)
      const nodes = treeData.descendants()
      const links = treeData.links()

      nodes.forEach((d) => (d.y = d.depth * 340))

      const link = g.selectAll(".link").data(links, (d) => d.target.data.title)
      const linkEnter = link.enter().insert("g", "g").attr("class", "link")

      linkEnter.append("path")
        .attr("class", "link-base")
        .attr("fill", "none")
        .attr("stroke", "#8d6e63")
        .attr("stroke-width", 12)
        .attr("opacity", 0.6)
        .attr("stroke-linecap", "round")
        .attr("d", diagonal)

      linkEnter.append("path")
        .attr("class", "link-overlay")
        .attr("fill", "none")
        .attr("stroke", "#d7ccc8")
        .attr("stroke-width", 8)
        .attr("opacity", 0.7)
        .attr("stroke-linecap", "round")
        .attr("d", diagonal)

      const linkUpdate = linkEnter.merge(link)
      linkUpdate.select(".link-base").transition().duration(duration).attr("d", diagonal)
      linkUpdate.select(".link-overlay").transition().duration(duration).attr("d", diagonal)
      link.exit().remove()

      const node = g.selectAll(".node").data(nodes, (d) => d.data.title)
      const nodeEnter = node.enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => {
          return `translate(${source.x0},${source.y0})`
        })
        .on("click", (event, d) => {
          event.stopPropagation()

          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
          }

          setPopover({ visible: false, node: null, x: 0, y: 0 })

          if (firstTime) {
            setFirstTime(false)
            localStorage.setItem('treeInteracted', 'true')
            if (onInteraction) onInteraction()
          }

          if (d.parent) {
            d.parent.children?.forEach((child) => {
              if (child !== d) collapse(child)
            })
          }

          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }

          update(d)
        })
        .on("mouseenter", function(event, d) {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
          }

          if (d.data.visualization) {
            const circle = d3.select(this).select("circle").node()
            const rect = circle.getBoundingClientRect()

            setPopover({
              visible: true,
              node: d.data,
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            })
          }
        })
        .on("mouseleave", () => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
          }
          hoverTimeoutRef.current = setTimeout(() => {
            setPopover({ visible: false, node: null, x: 0, y: 0 })
          }, 300)
        })

      nodeEnter.each(function(d) {
        if (d.depth === 0 && firstTime) {
          const nodeGroup = d3.select(this)
          const radius = 20 + Math.max(0, 3 - d.depth) * 4

          nodeGroup.append("circle")
            .attr("class", "root-pulse-ring")
            .attr("r", radius + 10)
            .attr("fill", "none")
            .attr("stroke", "#ff6b6b")
            .attr("stroke-width", 3)
            .attr("opacity", 0)
            .style("pointer-events", "none")

          function pulse() {
            nodeGroup.select(".root-pulse-ring")
              .transition()
              .duration(1500)
              .attr("r", radius + 30)
              .attr("opacity", 0.8)
              .transition()
              .duration(1500)
              .attr("r", radius + 10)
              .attr("opacity", 0)
              .on("end", pulse)
          }
          pulse()
        }
      })

      nodeEnter.append("circle")
        .attr("r", (d) => 20 + Math.max(0, 3 - d.depth) * 4)
        .attr("fill", (d) => d._children ? "#2e7d32" : "#388e3c")
        .attr("stroke", (d) => d.depth === 0 && firstTime ? "#ff6b6b" : "#14532d")
        .attr("stroke-width", (d) => d.depth === 0 && firstTime ? 5 : 3)
        .style("cursor", "pointer")
        .style("filter", (d) => d.depth === 0 && firstTime ? "drop-shadow(0 0 10px #ff6b6b)" : "none")

      nodeEnter.each(function(d) {
        if (d._children) {
          const nodeGroup = d3.select(this)
          const radius = 20 + Math.max(0, 3 - d.depth) * 4
          nodeGroup.append("text")
            .attr("class", "expand-indicator")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", `${radius * 1.2}px`)
            .attr("font-weight", "bold")
            .attr("fill", "#1b5e20")
            .attr("pointer-events", "none")
            .text("+")
        }
      })

      nodeEnter.each(function(d) {
        const nodeGroup = d3.select(this)
        const radius = 20 + Math.max(0, 3 - d.depth) * 4
        const labelY = radius + 40
        const maxWidth = d.depth === 0 ? 200 : 160
        const words = d.data.title.split(/\s+/)
        const lines = []
        let currentLine = words[0]

        const tempText = nodeGroup.append("text")
          .attr("font-family", "Inter, Poppins, Montserrat, system-ui, sans-serif")
          .attr("font-size", d.depth === 0 ? "18px" : "16px")
          .attr("font-weight", d.depth === 0 ? "700" : "600")
          .style("visibility", "hidden")

        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + " " + words[i]
          tempText.text(testLine)
          const testWidth = tempText.node().getComputedTextLength()
          if (testWidth > maxWidth) {
            lines.push(currentLine)
            currentLine = words[i]
          } else {
            currentLine = testLine
          }
        }
        lines.push(currentLine)
        tempText.remove()

        const lineHeight = d.depth === 0 ? 22 : 20
        const textGroup = nodeGroup.append("g").attr("class", "node-label")

        lines.forEach((line, i) => {
          const yOffset = labelY + (i * lineHeight)
          const text = textGroup.append("text")
            .attr("x", 0)
            .attr("y", yOffset)
            .attr("text-anchor", "middle")
            .attr("font-family", "Inter, Poppins, Montserrat, system-ui, sans-serif")
            .attr("font-size", d.depth === 0 ? "18px" : "16px")
            .attr("font-weight", d.depth === 0 ? "700" : "600")
            .attr("fill", "#1b5e20")
            .attr("opacity", 0.95)
            .style("pointer-events", "none")
            .text(line)

          text.style("paint-order", "stroke")
            .style("stroke", "#ffffff")
            .style("stroke-width", "4px")
            .style("stroke-linecap", "round")
        })

        if (d.depth === 0 && firstTime) {
          const clickHereText = textGroup.append("text")
            .attr("class", "click-here-hint")
            .attr("x", 0)
            .attr("y", labelY + (lines.length * lineHeight) + 30)
            .attr("text-anchor", "middle")
            .attr("font-family", "Inter, system-ui, sans-serif")
            .attr("font-size", "16px")
            .attr("font-weight", "700")
            .attr("fill", "#ff6b6b")
            .style("pointer-events", "none")
            .text("👆 Click here to explore")

          function blink() {
            clickHereText
              .transition()
              .duration(800)
              .attr("opacity", 0.2)
              .transition()
              .duration(800)
              .attr("opacity", 1)
              .on("end", blink)
          }
          blink()
        }
      })

      const nodeUpdate = nodeEnter.merge(node)
      nodeUpdate.transition().duration(duration).attr("transform", (d) => {
        return `translate(${d.x},${d.y})`
      })
      nodeUpdate.select("circle")
        .attr("fill", (d) => d._children ? "#2e7d32" : "#388e3c")
        .attr("stroke", (d) => d.depth === 0 && firstTime ? "#ff6b6b" : "#14532d")
        .attr("stroke-width", (d) => d.depth === 0 && firstTime ? 5 : 3)

      nodeUpdate.select(".expand-indicator").remove()
      nodeUpdate.each(function(d) {
        if (d._children) {
          const nodeGroup = d3.select(this)
          const radius = 20 + Math.max(0, 3 - d.depth) * 4
          nodeGroup.append("text")
            .attr("class", "expand-indicator")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", `${radius * 1.2}px`)
            .attr("font-weight", "bold")
            .attr("fill", "#1b5e20")
            .attr("pointer-events", "none")
            .text("+")
        }
      })

      node.exit().remove()
      nodes.forEach((d) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    }

    function diagonal(d) {
      return `M${d.source.x},${d.source.y} C${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }

    update(root)

    svg.on("click", () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      setPopover({ visible: false, node: null, x: 0, y: 0 })
    })

  }, [firstTime, onInteraction])

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handlePopoverMouseLeave = () => {
    setPopover({ visible: false, node: null, x: 0, y: 0 })
  }

  return (
    <>
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <svg 
          ref={svgRef} 
          style={{ 
            display: 'block',
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      {popover.visible && (
        <div
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        >
          <EnhancedPopover node={popover.node} x={popover.x} y={popover.y} />
        </div>
      )}
    </>
  )
}

export default TreeChartWithPopovers