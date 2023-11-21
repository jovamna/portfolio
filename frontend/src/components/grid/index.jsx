//import "./grid.css";
import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";

type GridItemsAlignment =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline";

type GridJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
type GridGap = string;

interface GridProps {
  alignItems?: GridItemsAlignment;
  children: React.ReactNode;
  column?: boolean;
  expanded?: boolean;
  justify?: GridJustify;
  lg?: GridSizes;
  md?: GridSizes;
  row?: boolean;
  sm?: GridSizes;
  style?: CSSProperties;
  padding?: GridGap;
}

const GridWrapper = styled.div<{ padding: GridGap }>`
    &.column {
        padding-left: ${({ padding }) => padding};
        padding-right: ${({ padding }) => padding};
    }

    &.column > .row {
        margin-left: -${({ padding }) => padding};
        margin-right: -${({ padding }) => padding};
    }
`;

const Grid: FunctionComponent<GridProps> = props => {
  const {
    alignItems,
    children,
    column,
    expanded,
    justify,
    lg,
    md,
    row,
    sm,
    style,
  } = props;

  const isRow: boolean = row || !column;
  const padding: GridGap = props.padding || "0.9375rem";

  const classes: string =
    (!isRow ? "column" : "row") +
    // Row styling
    (isRow && expanded ? ` ${"expanded"}` : "") +
    (isRow && justify ? ` ${justify}` : "") +
    (isRow && alignItems ? ` ${"align-" + alignItems}` : "") +
    // Column styling
    (!isRow && sm ? ` ${"sm-" + sm}` : "") +
    (!isRow && md ? ` ${"md-" + md}` : "") +
    (!isRow && lg ? ` ${"lg-" + lg}` : "");

  return <GridWrapper padding={padding} style={style} className={classes}>{children}</GridWrapper>;
};

export default Grid;
