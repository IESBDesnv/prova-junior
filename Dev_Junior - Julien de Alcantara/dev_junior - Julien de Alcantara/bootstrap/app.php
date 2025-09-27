<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (Throwable $e, $request) {
            // Não interceptar exceções de validação
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return null; // Deixa o Laravel tratar naturalmente
            }
            
            // Se for uma requisição Inertia, renderizar páginas de erro personalizadas
            if ($request->header('X-Inertia') || $request->wantsJson()) {
                $status = 500;
                
                if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
                    $status = $e->getStatusCode();
                }
                
                switch ($status) {
                    case 404:
                        return \Inertia\Inertia::render('Errors/404')
                            ->toResponse($request)
                            ->setStatusCode(404);
                            
                    case 403:
                        return \Inertia\Inertia::render('Errors/403')
                            ->toResponse($request)
                            ->setStatusCode(403);
                            
                    case 500:
                        return \Inertia\Inertia::render('Errors/500')
                            ->toResponse($request)
                            ->setStatusCode(500);
                            
                    default:
                        return \Inertia\Inertia::render('Errors/Error', [
                            'status' => $status,
                            'message' => $e->getMessage()
                        ])->toResponse($request)->setStatusCode($status);
                }
            }
        });
    })->create();
