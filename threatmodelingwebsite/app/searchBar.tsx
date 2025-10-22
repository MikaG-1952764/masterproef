import { use, useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

const data = [
  { label: 'Node 1' },
  { label: 'Node 2' },
  { label: 'Node 3' },
  { label: 'Node 4' },
  { label: 'Node 5' },
];

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<typeof data>([]);


    const handleSearch = useCallback((term: string) => {
        if (term.trim() === '') {
            setResults([]);
            return;
        } else {
            const results = data.filter(item => item.label.toLowerCase().includes(term.toLowerCase()));
            setResults(results);
            console.log(results);
        }
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, handleSearch]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

  return (
    <TextField
        value={searchTerm}
        onChange={handleInputChange}
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Search for node"
    />
  );
}