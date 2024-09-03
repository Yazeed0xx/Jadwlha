import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemp';
import { request } from 'http';

const resend = new Resend(process.env.RESEND_API_KEY);
const Acme = process.env.Acme as string


export async function POST(request: Request) {
      const { email, firstName } = await request.json();
      await resend.emails.send({
        from:Acme ,
        to: email,
        subject: 'Hello from jadwlha Team',
        react: EmailTemplate({ firstName }),
      });
      
  }