import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { useState, useEffect } from "react";
import { IAsigneeDropdown } from "@/utils/interface";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (
  name: string,
  personName: readonly string[],
  theme: Theme
) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const AddAsignee = (props: IAsigneeDropdown) => {
  const theme = useTheme();
  const { personName, setPersonName } = props;
  const dispatch = useAppDispatch();
  const [names, setNames] = useState<string[]>([]);
  const allUsers = useAppSelector((state) => state.allUsers.user);
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setNames([]);
    allUsers.forEach((user) => {
      if (user.companyId?.match(loggedUser.companyId))
        setNames((prevState) => [...prevState, user.email]);
    });
  }, [allUsers, loggedUser.companyId]);

  useEffect(() => {
    dispatch(getAllUserData());
    dispatch(getLoggedUserData());
    setNames([]);
  }, [dispatch]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel />
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
