import express from "express";
import { CourseSample } from "./CourseSample";
import { HelloSample } from "./HelloSample";

const app = express();
app.use( express.json() );

HelloSample.applySample( app );
CourseSample.applySample( app );

export const server = app;