import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Editor, EditorBlock, EditorState } from 'draft-js';
import './lines_number.css';

import kincLogo from './images/kinc-logo.png';

const useStyles = (theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
}));


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    };

    handleChange = editorState => {
        this.setState({
            editorState
        })
    };


    render() {
        const classes = this.props.classes;
        return (
            <div className="App">
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar src={kincLogo} className={classes.avatar} />
                        
                            <form className={classes.form} noValidate>
                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.handleChange}
                                    blockRendererFn={blockRendererFn}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    ミスを見るぞ
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

class Line extends React.Component {
  render() {
    const { block, contentState } = this.props;
    const lineNumber =
      contentState
        .getBlockMap()
        .toList()
        .findIndex(item => item.key === block.key) + 1;
    return (
      <div className="line" data-line-number={lineNumber}>
        <div className="line-text">
          <EditorBlock {...this.props} />
        </div>
      </div>
    );
  }   
}

const blockRendererFn = () => ({
  component: Line,
});

export default withStyles(useStyles)(App);
