import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grow, Container, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch, location]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mobile}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
