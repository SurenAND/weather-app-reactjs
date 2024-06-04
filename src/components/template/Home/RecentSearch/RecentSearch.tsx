import { Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { recentSearch } from "../../../../types/types";

export default function RecentSearch({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const initialRecentSearches: recentSearch[] = [
    { id: "1", search: "London" },
    { id: "2", search: "Paris" },
    { id: "3", search: "Tokyo" },
    { id: "4", search: "New York" },
  ];
  const [recentSearches, setRecentSearches] = useState<recentSearch[]>(
    initialRecentSearches
  );

  return (
    <Stack alignItems="center" color="white" gap={1}>
      <Typography variant="body1">Your recent searches:</Typography>
      <Grid textAlign="center" container spacing={2}>
        {recentSearches.map((search) => (
          <Grid key={search.id} item xs={12} sm={6} md={3}>
            <Button
              sx={{
                py: 1,
                px: 2,
                color: "white",
                fontWeight: "600",
                fontSize: 24,
                transitionTimingFunction: "ease-in",
                ":hover": { bgcolor: "rgba(55, 65, 81, .2)" },
              }}
              variant="text"
              onClick={() => setQuery(`?q=${search.search}`)}
            >
              {search.search}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
