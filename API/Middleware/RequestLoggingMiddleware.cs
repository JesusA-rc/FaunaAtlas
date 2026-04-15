using System.Diagnostics;

namespace API.Middleware;

public class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestPath = context.Request.Path;
        var requestMethod = context.Request.Method;

        try
        {
            await next(context);
        }
        finally
        {
            stopwatch.Stop();
            var statusCode = context.Response.StatusCode;
            
            if (statusCode >= 400)
            {
                logger.LogWarning("Request {Method} {Path} finished in {Elapsed}ms with Status {StatusCode}", 
                    requestMethod, requestPath, stopwatch.ElapsedMilliseconds, statusCode);
            }
            else
            {
                logger.LogInformation("Request {Method} {Path} finished in {Elapsed}ms with Status {StatusCode}", 
                    requestMethod, requestPath, stopwatch.ElapsedMilliseconds, statusCode);
            }
        }
    }
}
