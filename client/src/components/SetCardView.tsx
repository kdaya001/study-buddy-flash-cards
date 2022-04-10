import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SetCardView = ({setViewCardAmount, viewCardAmount}:any) => {
  const handleChange = (event: any) => {
    setViewCardAmount(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>Flash Card Amount</InputLabel>
        <Select
          labelId='view-card-simple-select-label'
          id='view-card-simple-select'
          value={viewCardAmount}
          label='cardAmount'
          onChange={handleChange}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}