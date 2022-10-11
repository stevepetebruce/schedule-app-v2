import { GetServerSideProps, NextApiRequest } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";
import Layout from "src/components/layout";
import VenueForm from "src/components/venueForm";

export default function Add() {
  return <Layout main={<VenueForm />} />
}


export const getServerSideProps: GetServerSideProps = async({req, res}) => {
  
  const uid = await loadIdToken(req as NextApiRequest)

  if(!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {}
  } 
}