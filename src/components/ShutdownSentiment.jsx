import React, { useState } from "react";
import { Popover, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ShutdownSentiment = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const data = [
    { label: "Very Concerned", value: 25, color: "#e74c3c" },
    { label: "Somewhat Concerned", value: 41, color: "#f1c40f" },
    { label: "Not Concerned", value: 34, color: "#2ecc71" },
  ];

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <div className="p-4 rounded-2xl bg-blue-900 text-white shadow-md text-center">
      <h3 className="text-lg font-semibold mb-1">Shutdown Sentiment</h3>
      <p className="text-sm text-gray-200 mb-3">
        Public concern over the federal shutdown (Washington Post, Oct 2025)
      </p>

      <div className="text-3xl font-bold mb-1">66%</div>
      <div className="text-sm text-gray-300 mb-2">Concerned Overall</div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ textTransform: "none", fontWeight: 500 }}
      >
        View Breakdown
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div style={{ width: 360, height: 220, padding: "1rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={[{ name: "Concern Levels" }]}>
              {data.map((entry, index) => (
                <Bar
                  key={index}
                  dataKey="value"
                  stackId="a"
                  fill={entry.color}
                  name={`${entry.label} (${entry.value}%)`}
                  data={[entry]}
                >
                  <Cell fill={entry.color} />
                </Bar>
              ))}
              <XAxis type="number" hide />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Popover>
    </div>
  );
};

export default ShutdownSentiment;
