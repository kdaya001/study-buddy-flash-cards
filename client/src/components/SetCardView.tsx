import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SetCardView = ({setViewCardAmount, viewCardAmount, data}:any) => {
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
          {data.length > 0 && data.length < 10 && <MenuItem value={data.length}>All</MenuItem>}
          {data.length >= 10 && <MenuItem value={10}>Ten</MenuItem>}
          {data.length >= 20 && <MenuItem value={20}>Twenty</MenuItem>}
          {data.length >= 30 && <MenuItem value={30}>Thirty</MenuItem>}
        </Select>
      </FormControl>
    </div>
  );
}