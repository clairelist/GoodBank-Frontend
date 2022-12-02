import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons() {
  return (
    <Stack spacing={2} alignItems={'flex-end'}>
      <Pagination count={5} showFirstButton showLastButton />
    </Stack>
  );
}