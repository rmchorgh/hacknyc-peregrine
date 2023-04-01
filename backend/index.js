import { module as tlinear_mod } from "./text_linear_summary.js";
import request from "./cohere.js";

request(tlinear_mod("Tell me about yourself.", "some"))
