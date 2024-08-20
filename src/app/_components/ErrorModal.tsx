'use client';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ErrorModal = () => {
  const [timestamp, setTimestamp] = useState<string>();
  const [path, setPath] = useState<string>();
  useEffect(() => {
    setTimestamp(dayjs().format());
    setPath(window.location.href);
  }, []);

  return (
    <Modal open={true}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          display: 'grid',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Stack>
          <Typography>データ取得中にエラーが発生しました。</Typography>
          <Typography>
            連続して発生する場合は管理者に問い合わせてください。
          </Typography>
          <Typography>timestamp: {timestamp}</Typography>
          <Typography>current URL: {path}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
