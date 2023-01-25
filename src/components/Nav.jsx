import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const Nav = () => {

    return(
        <Grid container sx={{ color: "text.primary" }} style={{ margin: "3rem" }}>
<Grid item xs={1}>
  <Typography>More</Typography>
</Grid>
<Grid item xs={1}>
  <ExpandMoreOutlinedIcon />
</Grid>
<Grid item xs={1}>
  <Typography>Menu</Typography>
</Grid>
<Grid item xs={1}>
  <MenuIcon />
</Grid>
<Grid item xs={1}>
  <Typography>Cart</Typography>
</Grid>
<Grid item xs={1}>
  <ShoppingCartIcon />
</Grid>
</Grid>
    )

}

export default Nav
