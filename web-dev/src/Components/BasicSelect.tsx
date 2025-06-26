import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

type BasicSelectProps = {
    items: Array<{ value: string, label: string }>, 
    label: string, 
    onChange: (value: any) => void, 
    initialValue?: string
};

export default function BasicSelect(props: BasicSelectProps) {
  const { label, initialValue, items, onChange } = props;
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={selectedValue}
          label={label}
          onChange={handleChange}
        >
            {items.map(({value, label}) => <MenuItem value={value}>{label}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
