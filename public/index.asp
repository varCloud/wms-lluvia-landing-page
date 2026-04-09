<%@ Language="VBScript" %>
<%
Response.Buffer = True
Response.ContentType = "text/html; charset=utf-8"
Response.CacheControl = "no-cache"
Response.Expires = -1

Set fso = CreateObject("Scripting.FileSystemObject")
filePath = Server.MapPath("index.html")

On Error Resume Next
Set file = fso.OpenTextFile(filePath, 1)
If Err.Number = 0 Then
    content = file.ReadAll()
    file.Close()
    Response.Write content
Else
    Response.Status = "404 Not Found"
    Response.Write "File not found"
End If
%>
