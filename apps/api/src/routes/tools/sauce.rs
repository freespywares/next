use actix_web::{get, web, Responder, HttpResponse};
use sauce_api::source::{Output, yandex::Yandex, Source};
use sauce_api::error::Error;
use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
struct SauceQuery {
    url: String
}

#[derive(Serialize)]
struct SauceError {
    message: String
}

#[get("/sauce")]
pub async fn sauce_iqdb(
    query: web::Query<SauceQuery>
) -> impl Responder {
    let source = Yandex::create(()).await.unwrap();
    let res: Result<Output, Error> = source.check(&query.url).await;

    match res {
        Ok(result) => {
            HttpResponse::Ok().json(result)
        }
        Err(..) => {
            let error = SauceError {
                message: "no results found by that url".to_string()
            };

            HttpResponse::NotFound().json(error)
        }
    }
}

