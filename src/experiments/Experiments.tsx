import React from "react";
import {Box, CardContent, Grid, Paper, styled} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function Experiments() {

    const arr = new Array(14);
    arr.fill(0)

    return (
        <Box sx={{width: '100%', paddingTop: 2}}>
            <Grid container rowSpacing={4} columnSpacing={{xs: 2, sm: 4, md: 3}}>
                {arr.map((x, index) => {
                    return <Grid item xs={2} sm={4} md={4} key={"a" + index.toString()}>
                        <Item key={index}>
                            <CardContent>Kísérlet</CardContent>
                            <CardContent>elemek száma</CardContent>
                            <CardContent>kitöltések száma</CardContent>
                        </Item>
                    </Grid>
                })}

            </Grid>
        </Box>
    );
}

export default Experiments;