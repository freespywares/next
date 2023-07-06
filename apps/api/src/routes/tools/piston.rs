use actix_web::{get, web, HttpResponse, Responder};
use piston_rs::{Client, Executor, File};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct QueryData {
	language: String,
	code: String,
}

#[get("/piston")]
pub async fn piston(body: web::Query<QueryData>) -> impl Responder {
	let client = Client::new();
	let executor = Executor::new()
		.set_language(&body.language)
		.set_version("*")
		.add_file(File::default().set_name("main.rs").set_content(&body.code));

	match client.execute(&executor).await {
		Ok(response) => {
			println!("Language: {}", response.language);
			println!("Version: {}", response.version);

			HttpResponse::Ok().body(response.run.output)
		}
		Err(e) => {
			println!("Something went wrong contacting Piston.");
			println!("{}", e);

			HttpResponse::InternalServerError().body("exception")
		}
	}
}
