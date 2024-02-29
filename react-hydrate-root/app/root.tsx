import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration,} from "@remix-run/react";
import {createHead} from "remix-island";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

export const meta: MetaFunction = () => [
    {title: "React hydrateRoot and remix-island demo"},
    {name: "description", content: "React hydrateRoot and remix-island demo"},
    {charset: 'utf-8'},
    {viewport: 'width=device-width,initial-scale=1'},
];

export const Head = createHead(() => (
    <>
        <Meta/>
        <Links/>
    </>
));

export default function App() {
    return (
        <>
            <Head/>
            <Outlet/>
            <ScrollRestoration/>
            <Scripts/>
            <LiveReload/>
        </>
    );
}
