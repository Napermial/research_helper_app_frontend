import React from "react";
import {Box, CardContent, Grid, Paper, styled} from "@mui/material";
import axios from "axios";
import {withAuth0} from '@auth0/auth0-react';


const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


interface Experiment {
    name: string,
    items: number
    fills: number,
}

interface State {
    experiments: Experiment[];
    isLoaded: boolean;
}

class Experiments extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            experiments: new Array<Experiment>(),
            isLoaded: false
        }
    }


    async componentDidMount(this: Experiments) {
        await loadExperiments.call(this);

        async function loadExperiments(this: Experiments) {

            try {
                const {getAccessTokenSilently} = this.props.auth0;
                const accessToken = await getAccessTokenSilently({audience: process.env.REACT_APP_API_AUDIENCE});

                await axios.get(process.env.REACT_APP_API_BASE_URL + "/experiments/list", {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                ).then((value) => {
                    const experiments: Experiment[] = value.data.data as Experiment[];
                    experiments.forEach((experiment) => {
                        this.setState((prevState) => {
                            return {
                                experiments: [...prevState.experiments, {
                                    name: experiment.name,
                                    fills: experiment.fills,
                                    items: experiment.items
                                }]
                            }
                        })
                    })
                    this.setState({isLoaded: true})
                })
            } catch (e) {
                console.error(e)
            }
        }

    }


    render() {
        return <Box sx={{width: '100%', padding:2 }}>
            {this.state.isLoaded && (<Grid container rowSpacing={4} columnSpacing={{xs: 2, sm: 4, md: 3}}>
                {this.state.experiments.map((x, index) => {
                    return <Grid item xs={2} sm={4} md={4} key={"a" + index.toString()}>
                        <Item key={index}>
                            <CardContent>Kísérlet neve: {x.name}</CardContent>
                            <CardContent>Elemek száma: {x.items}</CardContent>
                            <CardContent>kitöltések száma: {x.fills}</CardContent>
                        </Item>
                    </Grid>
                })}
            </Grid>)}
        </Box>
    }
}


export default withAuth0(Experiments);