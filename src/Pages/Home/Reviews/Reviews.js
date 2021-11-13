import * as React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { CircularProgress, Container, Rating } from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Reviews = () => {
    const [reviews, setReviews] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = reviews.length;
    // console.log(maxSteps);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    React.useEffect(() => {
        axios.get('https://rocky-retreat-26040.herokuapp.com/reviews')
            .then(res => {
                setReviews(res.data);
                setIsLoading(true);
            })
    });
    if (!isLoading) { return <CircularProgress sx={{ mt: 5 }} /> }

    return (
        <Container>
            <Paper sx={{ p: 5 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Reviews</Typography>

                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {reviews.map((step, index) => (
                        <Box key={step._id}>
                            <Typography variant="h5">
                                {step?.data?.review}
                            </Typography>
                            <Typography variant="body1">
                                Name: {step?.data?.name}
                            </Typography>
                            <Typography variant="body1">
                                Email: {step?.data?.email}
                            </Typography>
                            <Rating
                                name="text-feedback" value={parseInt(step?.data?.status)} readOnly
                                precision={0.5} />
                        </Box>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Paper>
        </Container>
    );
};

export default Reviews;