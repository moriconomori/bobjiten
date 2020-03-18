import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from 'next/link';

export default function Index() {
  return (
    <Container maxWidth="sm" disableGutters>
      <Box my={4}>
        <Typography variant="h2" component="h1" align="center">
          カタヌキ
        </Typography>
      </Box>

      <Box mb={8}>
        <Typography align="center">
          カタカナ言葉をカタカナ抜きで説明しよう！
        </Typography>
      </Box>

      <Box my={2} px={8}>
        <Box mb={4}>
          <Link href="/settings">
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ borderRadius: 50 }}
            >
              設定
            </Button>
          </Link>
        </Box>

        <Box mb={2}>
          <Link href="/play">
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              style={{ borderRadius: 50 }}
            >
              始める
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
