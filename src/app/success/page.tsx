"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import { 
  CheckCircle,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { useThemeMode } from '../context/ThemeContext';

export default function SuccessPage() {
  const theme = useTheme();
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: 4,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Theme Toggle Button */}
      <IconButton
        onClick={toggleMode}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        {mode === 'light' ? (
          <DarkMode sx={{ color: theme.palette.primary.main }} />
        ) : (
          <LightMode sx={{ color: theme.palette.primary.main }} />
        )}
      </IconButton>

      <Container maxWidth="sm">
        <Card elevation={0}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Stack spacing={3} alignItems="center">
              {/* Başarı İkonu */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle 
                  sx={{ 
                    fontSize: 32, 
                    color: theme.palette.success.main,
                  }} 
                />
              </Box>

              {/* Başlık */}
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 600, 
                  color: theme.palette.text.primary,
                }}
              >
                İşlem Bildirimi Alındı
              </Typography>

              {/* Açıklama */}
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  maxWidth: 360,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Ödeme bildiriminiz başarıyla alınmıştır. İşleminiz en kısa sürede sonuçlandırılacaktır.
              </Typography>

              {/* Bilgi Kutusu */}
              <Box 
                sx={{ 
                  backgroundColor: theme.palette.grey[50],
                  border: `1px solid ${theme.palette.grey[200]}`,
                  p: 3, 
                  borderRadius: 2, 
                  width: '100%',
                }}
              >
                <Stack spacing={1.5}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 400,
                      textAlign: 'left',
                    }}
                  >
                    • Ödemeniz kontrol edildikten sonra hesabınıza yansıyacaktır
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontWeight: 400,
                      textAlign: 'left',
                    }}
                  >
                    • Herhangi bir sorun durumunda sizinle iletişime geçilecektir
                  </Typography>
                </Stack>
              </Box>

              {/* Ana Sayfaya Dön */}
              <Button
                variant="outlined"
                size="large"
                onClick={() => router.push('/')}
                sx={{
                  py: 1.5,
                  px: 3,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  borderColor: theme.palette.grey[300],
                  color: theme.palette.text.primary,
                  '&:hover': {
                    borderColor: theme.palette.text.primary,
                    backgroundColor: alpha(theme.palette.text.primary, 0.04),
                  },
                }}
              >
                Ana Sayfaya Dön
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
} 