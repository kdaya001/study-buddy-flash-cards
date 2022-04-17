import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';

export const SelectDropDown = (props: any) => {
  /**
   * props:
   * [{id, option}]
   */

  const handleChange = (event: any) => {
    props.tracker({
      tag: event.target.dataset.value,
      id: event.target.dataset.id,
    });
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        label='selection'
        defaultValue=''>
        {props.options.map((item: any) => {
          return (
            <MenuItem
              onClick={handleChange}
              key={item._id}
              value={item?.option || item?.tag}
              data-id={item._id}>
              {item?.option || item?.tag}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
