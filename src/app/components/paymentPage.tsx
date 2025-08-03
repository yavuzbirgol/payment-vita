"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Container,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ContentCopy,
  CheckCircle,
  LightMode,
  DarkMode,
} from "@mui/icons-material";
import { useThemeMode } from '../context/ThemeContext';

interface BankAccount {
  name: string;
  account_number: string;
  iban: string;
}

interface PaymentData {
  amount: number;
  bank_account: BankAccount;
}

export default function PaymentPage({ data }: { data: PaymentData }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  const handlePaymentComplete = () => {
    setConfirmDialog(true);
  };

  const handleConfirm = () => {
    setConfirmDialog(false);
    router.push('/success');
  };

  const handleCancel = () => {
    setConfirmDialog(false);
  };

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
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={4}>
              {/* Tutar */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.light, 0.12)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  }
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.primary.dark,
                      fontWeight: 600,
                      letterSpacing: '1px',
                    }}
                  >
                    YATIRILACAK TUTAR
                  </Typography>
                </Stack>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: '2.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(data.amount)}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.primary.dark, 0.7),
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  Türk Lirası
                </Typography>
              </Paper>

              {/* Banka Bilgileri */}
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 2.5, 
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Banka Bilgileri
                </Typography>

                <Stack spacing={2}>
                  {/* Hesap Adı */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        mb: 1,
                        display: 'block'
                      }}
                    >
                      Hesap Adı
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        backgroundColor: theme.palette.grey[50],
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {data.bank_account.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(data.bank_account.name, 'accountName')}
                          sx={{ 
                            color: copied === 'accountName' ? theme.palette.success.main : theme.palette.text.secondary,
                          }}
                        >
                          {copied === 'accountName' ? 
                            <CheckCircle fontSize="small" /> : 
                            <ContentCopy fontSize="small" />
                          }
                        </IconButton>
                      </Stack>
                    </Paper>
                  </Box>

                  {/* IBAN */}
                  <Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        mb: 1,
                        display: 'block'
                      }}
                    >
                      IBAN Numarası
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        backgroundColor: theme.palette.grey[50],
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontFamily: 'Menlo, Monaco, monospace',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            letterSpacing: '0.5px',
                            color: theme.palette.text.primary,
                          }}
                        >
                          {data.bank_account.account_number}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(data.bank_account.iban, 'iban')}
                          sx={{ 
                            color: copied === 'iban' ? theme.palette.success.main : theme.palette.text.secondary,
                          }}
                        >
                          {copied === 'iban' ? 
                            <CheckCircle fontSize="small" /> : 
                            <ContentCopy fontSize="small" />
                          }
                        </IconButton>
                      </Stack>
                    </Paper>
                  </Box>
                </Stack>
              </Box>

              {/* Uyarı */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: mode === 'light' ? '#FEF3C7' : '#4A3A1A',
                  border: `1px solid ${mode === 'light' ? '#FCD34D' : '#A16207'}`,
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: mode === 'light' ? '#92400E' : '#FCD34D',
                    textAlign: 'center',
                  }}
                >
                  Önemli: Açıklamayı boş bırakınız.
                </Typography>
              </Paper>

              {/* Buton */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handlePaymentComplete}
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  backgroundColor: theme.palette.primary.main,
                  mt: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Ödemeyi Yaptım
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Alt Bilgi */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          textAlign="center"
          sx={{ 
            mt: 2,
            fontWeight: 400,
          }}
        >
          İşleminiz ödeme sonrasında hemen hesabınıza yansıyacaktır.
        </Typography>
      </Container>

      {/* Onay Dialog */}
      <Dialog
        open={confirmDialog}
        onClose={handleCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1, fontSize: '1.25rem', fontWeight: 600 }}>
          Ödeme Onayı
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body1" color="text.secondary">
            Ödemeyi gerçekten yaptınız mı?<br />
            Devam etmek istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          <Button 
            onClick={handleCancel}
            variant="outlined"
            sx={{ 
              borderColor: theme.palette.grey[300],
              color: theme.palette.text.secondary,
              px: 3,
            }}
          >
            Hayır
          </Button>
          <Button 
            onClick={handleConfirm}
            variant="contained"
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              px: 3,
            }}
          >
            Evet, Devam Et
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
