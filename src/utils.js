import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
    const options = {
        auth: {
            domain: process.env.MAILGUN_DOMAIN,
            api_key: process.env.MAILGUN_APIKEY
        }
    };
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "zion@prismagram.com",
        to: adress,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);