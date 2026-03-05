-- 只导出「爱宝宝」相簿，无弹窗、不列全部相簿，避免卡住
-- 用法：osascript scripts/export-photos-from-apple-photos.applescript

set scriptPath to POSIX path of (path to me)
set scriptDir to do shell script "dirname " & quoted form of scriptPath
set exportRoot to do shell script "dirname " & quoted form of scriptDir
set exportPath to exportRoot & "/temp_photos_export"

do shell script "mkdir -p " & quoted form of exportPath

tell application "Photos"
	launch
	delay 3
	activate
	delay 1
	try
		set targetAlbum to album "爱宝宝"
		set mediaList to (get every media item of targetAlbum)
		set n to count of mediaList
		if n is 0 then
			display alert "相簿「爱宝宝」里没有照片" message "请先在「照片」里把要导出的照片放进「爱宝宝」相簿。"
		else
			set dest to (POSIX file exportPath) as alias
			export mediaList to dest without using originals
			display alert "导出完成" message "共 " & (n as text) & " 张，已保存到：\n" & exportPath & "\n\n接下来在终端执行：\n./scripts/copy-exported-to-pic.sh"
		end if
	on error errMsg
		display alert "导出失败" message "请确认「照片」里有名为「爱宝宝」的相簿。\n\n错误信息： " & errMsg
	end try
end tell
