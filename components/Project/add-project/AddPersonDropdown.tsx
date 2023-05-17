/* eslint-disable react/jsx-key */
import * as React from "react";
import useAutocomplete, {
  AutocompleteGetTagProps,
} from "@mui/base/useAutocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "tss-react/mui";
import { Colors } from "@/utils/colors";

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}
const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props;
  const { classes } = useStyles();
  return (
    <div {...other} className={classes.styledTag}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} className={classes.icon} />
    </div>
  );
};

export const AddPersonDropdown = () => {
  const top100Films = [
    { email: "The Shawshank Redemption" },
    { email: "The " },
    { email: "Shawshank Redemption" },
    { email: "Redemption" },
  ];

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    defaultValue: [],
    multiple: true,
    options: top100Films,
    getOptionLabel: (option) => option.email,
  });

  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div {...getRootProps()}>
        <div ref={setAnchorEl} className={classes.inputWrapper}>
          {value.map((option: UsersList, index: number) => (
            <Tag label={option.email} {...getTagProps({ index })} />
          ))}
          <input
            {...getInputProps()}
            className={classes.inputStyled}
            placeholder="select new member"
          />
        </div>
      </div>
      {groupedOptions.length > 0 ? (
        <ul {...getListboxProps()} className={classes.listBox}>
          {(groupedOptions as typeof top100Films).map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.email}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

interface UsersList {
  email: string;
}

const useStyles = makeStyles()((theme) => ({
  root: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.h4.fontSize,
    display: "block",
    paddingTop: theme.spacing(2),
  },
  label: {
    lineHeight: "1.5",
  },
  inputWrapper: {
    width: "25vw",
    justifyContent: "center",
    backgroundColor: Colors.lightBlue,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    ":hover": {
      borderColor: `${theme.palette.primary.dark}`,
    },
    ":focus": {
      borderColor: ` ${theme.palette.primary.dark}`,
      boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
    },
  },
  styledTag: {
    display: "flex",
    alignItems: "center",
    height: "22px",
    fontSize: theme.typography.body2.fontSize,
    margin: "2px",
    lineHeight: "22px",
    backgroundColor: theme.palette.secondary.light,
    border: "1px solid #e8e8e8",
    borderRadius: theme.spacing(0.5),
    boxSizing: "content-box",
    padding: "0px 4px 0px 10px",
    outline: "0",
    overflow: "hidden",
    ":focus": {
      borderColor: "#40a9ff",
      backgroundColor: "#e6f7ff",
    },
  },
  listElementStyles: {},
  icon: {
    height: "20px",
    width: "20px",
    paddingLeft: theme.spacing(0.5),
  },
  listBox: {
    width: "25vw",
    padding: theme.spacing(1),
    position: "absolute",
    backgroundColor: theme.palette.secondary.light,
    border: "1px solid #e8e8e8",
    overflow: "auto",
    maxHeight: "250px",
    borderRadius: theme.spacing(0.5),
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: theme.typography.body1.fontSize,
    listStyleType: "none",
  },
  inputStyled: {
    width: "20vw",
    justifyContent: "center",
    height: "25px",
    marginTop: theme.spacing(1),
  },
}));
