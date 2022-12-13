import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useRef } from 'react';

export default function PaginationButtons(props: any) {

  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo(0, 5000)
  }, [props.page]);

  const handleChange = (e: any, page: any) => {
    props.setPage(page);
  }

  return (
    <Stack spacing={2} alignItems={'flex-end'} mt={1}>
      <Pagination
        page={props.page}
        count={props.transactionCount}
        onChange={handleChange}
        shape='circular'
        variant='outlined'
        color='primary'
        showFirstButton
        showLastButton
      />
      <div ref={bottomRef} className={'bottom'} />
    </Stack>
  );
}