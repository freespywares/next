mod routes;
mod utils;

use actix_web::{
    get,
    http::header::{CacheControl, CacheDirective},
    middleware, web, App, HttpResponse, HttpServer, Responder,
};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("ok")
}

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok()
        .insert_header(CacheControl(vec![CacheDirective::NoCache]))
        .body("success")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let app = App::new()
            .wrap(middleware::Logger::default())
            .wrap(middleware::DefaultHeaders::new().add(("X-Version", env!("CARGO_PKG_VERSION"))))
            .service(hello)
            .service(health)
            .service(
                web::scope("/v1")
                    .service(routes::resize::resize)
                    .service(routes::convert::convert_type)
                    .service(routes::flip::flip_orientation)
                    .service(routes::blur::blur_image)
                    .service(routes::grayscale::grayscale)
                    .service(routes::huerotate::huerotate)
                    .service(routes::brighten::brighten),
            );

        app
    })
    .bind(("127.0.0.1", 4343))?
    .run()
    .await
}
