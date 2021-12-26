import React, {useEffect} from "react";
import {Box, CardContent, Grid, Paper, styled} from "@mui/material";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";


const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function Experiments() {

    const {getAccessTokenWithPopup} = useAuth0();

    const arr: Array<Object> = [];


    useEffect(() => {
        loadExperiments();
    },[])

    async function loadExperiments() {


        try {
            const accessToken = await getAccessTokenWithPopup({audience: "researchhelperappbd"});

            await axios.get("http://localhost:8000/experiments/list", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            ).then((value) => {
                arr.push(value)
            })
        } catch
            (e) {
            console.error(e)
        }


    }


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