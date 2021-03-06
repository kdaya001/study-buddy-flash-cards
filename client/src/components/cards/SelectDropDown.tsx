import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext } from 'react';
import { ApplicationContext } from '../../app-context';
import styles from './SelectDropDown.module.css';

export const SelectDropDown = ({ options, label, tracker }: any) => {
  const [appState, appAction] = useContext(ApplicationContext);
  const handleChange = (event: any) => {
    tracker({
      tag: event.target.dataset.value,
      id: event.target.dataset.id,
    });
  };

  return (
    <FormControl
      className={
        appState.theme === 'dark' ? styles.selectionDark : styles.selectionLight
      }
      sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select label='selection' defaultValue=''>
        {options.map((item: any) => {
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
