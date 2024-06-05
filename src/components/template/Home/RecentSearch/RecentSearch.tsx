import { Button, Grid, Stack, Typography } from "@mui/material";
import { recentSearch } from "../../../../types/types";

export default function RecentSearch({
  setQuery,
  recentSearches,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  recentSearches: recentSearch[];
}) {
  return (
    <Stack alignItems="center" color="white" gap={1}>
      <Typography variant="body1">Your recent searches:</Typography>
      <Grid textAlign="center" container spacing={2}>
        {recentSearches?.map((search) => (
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
