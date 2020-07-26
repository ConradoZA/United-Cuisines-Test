import React, { useState } from "react";
import { MapOverlay } from "./components/MapOverlay";
import Score from "./components/Score";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  Dialog,
  Slide,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./data/materialStyles";
import { Drawer as MyDrawer } from "./components/Drawer";
import { Modal } from "./components/Modal";
import * as capitalCities from "./data/capitalCities.json";
import { haversineDistance, randomNumber, malus } from "./data/maths";

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [points, setPoints] = useState(1500);
  const [successes, setSuccesses] = useState(0);
  const [question, setQuestion] = useState({});
  const [distance, setDistance] = useState(null);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState("none");
  const [showDistance, setShowDistance] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);

  const city = capitalCities.capitalCities;
  const totalCities = city.length;

  const setRandomCity = () => {
    const capital = city[randomCity(totalCities)];
    console.log(capital);
    return { name: capital.capitalCity, lat: capital.lat, lng: capital.long };
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  useEffect(() => {
    setQuestion(setRandomCity);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMapClick = (coordinates) => {
    setResult(coordinates);
    // setDistance(
    //   haversineDistance(
    //     { lat: question.lat, lng: question.lng },
    //     {
    //       lat: event.latLng.lat(),
    //       lng: event.latLng.lng(),
    //     }
    //   )
    // );
  };

  const onSubmit = () => {
    console.log("hola");
  };

  const handleShowDistance = () => {
    setShowDistance(!showDistance);
  };

  const handleShowEnd = () => {
    setShowEndGame(!showEndGame);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <h2>Capitals of Europe</h2>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <MyDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <MyDrawer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Score successes={successes} points={points} cityName={question.name} />
        <br />
        <MapOverlay
          style={{ margin: "0 40px" }}
          distance={distance}
          question={question}
          result={result}
          onMapClick={onMapClick}
          display={display}
        />
        <Button
          style={{ margin: "1rem 40%" }}
          variant="contained"
          color="secondary"
          onClick={onSubmit}
        >
          Answer
        </Button>
      </main>
      <Dialog
        open={showDistance}
        onClose={handleShowDistance}
        TransitionComponent={Transition}
      >
        <Modal title={} content={} />
      </Dialog>
      <Dialog
        open={showEndGame}
        onClose={handleShowEnd}
        TransitionComponent={Transition}
      >
        <Modal title={} content={} />
      </Dialog>
    </div>
  );
};

export default App;
