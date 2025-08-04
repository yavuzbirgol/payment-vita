import PaymentPagePapara from "../../components/paymentPagePapara";

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const data = await fetch('https://api.vitahavale.io/deposit/information/' + resolvedParams.id);
  const dataJson = await data.json();
  if (dataJson.statusCode === 400) {
    return <div>Hata: {dataJson.message}</div>;
  }
  return <PaymentPagePapara data={dataJson} />;
}