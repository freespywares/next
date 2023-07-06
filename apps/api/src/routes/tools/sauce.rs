use actix_web::{get, web, HttpResponse, Responder};
use sauce_api::error::Error;
use sauce_api::source::{yandex::Yandex, Output, Source};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SauceQuery {
	url: String,
}

#[derive(Serialize)]
pub struct SauceError {
	message: String,
}

#[get("/sauce")]
pub async fn sauce(query: web::Query<SauceQuery>) -> impl Responder {
	let source = Yandex::create(()).await.unwrap();
	let res: Result<Output, Error> = source.check(&query.url).await;

	match res {
		Ok(result) => HttpResponse::Ok().json(result),
		Err(..) => {
			let error = SauceError {
				message: "no results found by that url".to_string(),
			};

			HttpResponse::NotFound().json(error)
		}
	}
}
