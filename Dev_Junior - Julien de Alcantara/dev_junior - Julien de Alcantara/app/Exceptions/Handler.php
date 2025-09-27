<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        // Se for uma requisição Inertia, renderizar páginas de erro personalizadas
        if ($request->header('X-Inertia') || $request->wantsJson()) {
            return $this->renderInertiaError($request, $e);
        }

        return parent::render($request, $e);
    }

    /**
     * Render Inertia error pages
     */
    protected function renderInertiaError(Request $request, Throwable $e)
    {
        $status = 500;
        
        if ($e instanceof HttpException) {
            $status = $e->getStatusCode();
        }
        
        // Log do erro para debug
        \Log::error('Erro capturado pelo Handler: ' . $e->getMessage(), [
            'status' => $status,
            'url' => $request->url(),
            'headers' => $request->headers->all()
        ]);
        
        switch ($status) {
            case 404:
                return Inertia::render('Errors/404')
                    ->toResponse($request)
                    ->setStatusCode(404);
                    
            case 403:
                return Inertia::render('Errors/403')
                    ->toResponse($request)
                    ->setStatusCode(403);
                    
            case 500:
                return Inertia::render('Errors/500')
                    ->toResponse($request)
                    ->setStatusCode(500);
                    
            default:
                return Inertia::render('Errors/Error', [
                    'status' => $status,
                    'message' => $e->getMessage()
                ])->toResponse($request)->setStatusCode($status);
        }
    }
}
