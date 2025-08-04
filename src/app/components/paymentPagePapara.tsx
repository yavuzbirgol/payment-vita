"use client";
interface PaymentData {
  payment_url: string;
}

export default function PaymentPagePapara({ data }: { data: PaymentData }) {
  return <iframe src={data.payment_url} width="100%" style={{ border: 'none', height: '100vh' }} />;
}
