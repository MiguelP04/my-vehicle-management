import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { useState } from "react";

const states = [
  { label: "Todos", value: "all", color: "primary", activeBg: "#1e40af" }, // azul más oscuro
  {
    label: "Disponible",
    value: "Disponible",
    color: "success",
    activeBg: "#166534",
  }, // verde más oscuro
  { label: "En uso", value: "En uso", color: "warning", activeBg: "#92400e" }, // naranja oscuro
  {
    label: "En mantenimiento",
    value: "En mantenimiento",
    color: "danger",
    activeBg: "#7f1d1d",
  }, // rojo oscuro
];

export default function VehicleStatusTabs({ onChange }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedIndex(newValue);
    onChange(states[newValue].value);
  };

  return (
    <Tabs
      value={selectedIndex}
      onChange={handleChange}
      aria-label="Estado de vehículos"
      sx={{ bgcolor: "transparent" }}
    >
      <TabList
        disableUnderline
        sx={{
          py: 0.5,
          px: 1,
          gap: 1,
          borderRadius: "sm",
          bgcolor: "#374151",
          [`& .${tabClasses.root}`]: {
            px: 1.2,
            py: 0.4,
            fontSize: ".85rem",
            minHeight: "32px",
            borderRadius: "xs",
            transition: "all 0.2s ease-in-out",
          },
        }}
      >
        {states.map((state, index) => (
          <Tab
            key={state.value}
            disableIndicator
            color={state.color}
            variant="soft"
            sx={
              selectedIndex === index
                ? {
                    backgroundColor: state.activeBg,
                    color: "#fff",
                    boxShadow: "sm",
                  }
                : {}
            }
          >
            {state.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
