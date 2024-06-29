import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';

interface Question {
    text: string;
    options: string[];
    answer: string;
}

const AdminPanel: React.FC = () => {
    const [eventName, setEventName] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([{ text: '', options: ['', '', '', ''], answer: '' }]);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], answer: '' }]);
    };

    const handleSubmit = () => {
        axios.post('/admin/event', { name: eventName, questions })
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Panel</Typography>
            <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
            />
            {questions.map((q, idx) => (
                <Box key={idx} mb={2}>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={q.text}
                        onChange={e => {
                            const newQuestions = [...questions];
                            newQuestions[idx].text = e.target.value;
                            setQuestions(newQuestions);
                        }}
                    />
                    {q.options.map((opt, oidx) => (
                        <TextField
                            key={oidx}
                            label={`Option ${oidx + 1}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={opt}
                            onChange={e => {
                                const newQuestions = [...questions];
                                newQuestions[idx].options[oidx] = e.target.value;
                                setQuestions(newQuestions);
                            }}
                        />
                    ))}
                    <TextField
                        label="Answer"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={q.answer}
                        onChange={e => {
                            const newQuestions = [...questions];
                            newQuestions[idx].answer = e.target.value;
                            setQuestions(newQuestions);
                        }}
                    />
                </Box>
            ))}
            <Box display="flex" justifyContent="space-between">
                <IconButton color="primary" onClick={addQuestion}>
                    <AddIcon /> Add Question
                </IconButton>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                >
                    Submit Event
                </Button>
            </Box>
        </Container>
    );
};

export default AdminPanel;