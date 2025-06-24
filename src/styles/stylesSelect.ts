import { StylesConfig } from "react-select";

export const stylesSelect: StylesConfig<
  { value: string | undefined; label: string },
  true
> = {
  control: (base) => ({
    ...base,
    width: "440px",
    height: "48px",
    padding: "0px 16px 0px 16px",
    boxSizing: "border-box",
    borderRadius: "10px",
    marginTop: "8px",
    border: "2px solid #d1d1d1",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "24px",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }),
};
