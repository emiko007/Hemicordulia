Set objShell = CreateObject("Shell.Application")
Set objFSO = CreateObject("Scripting.FileSystemObject")
strPath = WScript.ScriptFullName
Set objFile = objFSO.GetFile(strPath)
strFolder = objFile.ParentFolder.Path
objShell.ShellExecute "powershell.exe", "-ExecutionPolicy Bypass -File """ & strFolder & "\setup-auto-sync.ps1""", strFolder, "runas", 1
