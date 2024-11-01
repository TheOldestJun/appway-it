import { Label } from "../ui/label"
import ComboBox from "./comboBox"
import { useState } from "react"

export default function Units() {
    return (
        <div>
            <Label htmlFor="units" className="text-sm">Одиниці виміру</Label>
            <ComboBox
                id="units"
                options={units}
                value={selectedUnits}
                onSelectedOption={setSelectedUnits}
                onCreateOption={(value) => handleCreateUnits(value)}
                isMulti={false}
                placeholder={"..."}
            />
        </div>
    )
}