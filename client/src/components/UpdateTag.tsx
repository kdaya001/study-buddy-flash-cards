import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const UpdateTag = ({tag, setTag}:any) => {
  const [allTags, setAllTags] = useState<any>([]);

  const handleChange = (event: any) => {
    setTag(event.target.value);
  };

  useEffect((): any => {
    axios.get(`/api/cards/tags`).then((res) => {
      if (res.data.length > 0) {
        setAllTags(res.data);
      }
    })
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>Flash Card Amount</InputLabel>
        <Select
          labelId='view-card-simple-select-label'
          id='view-card-simple-select'
          value={tag}
          label='cardAmount'
          onChange={handleChange}>
            {allTags.map((tag: any) => {
              return (
                <MenuItem key={tag._id} value={tag.tag}>{tag.tag}</MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </div>
  );
}