
local socket = require("socket")
local server = assert(socket.bind("*", 0))

time =10000
print("After connecting, you have "..time.." seconds to enter a line to be echoed")

if #arg < 1 then
	print(string.format("usage: lua %s <HTTP path> [-ip <ip address>] [-port <port number>] [-sleep <start sleep seconds>]", arg[0]))
	return
end



argLookup = {}

for i,v in ipairs(arg) do
	argLookup[v] = i
end

function optionValue(option)
	local i = argLookup[option]
	if i then
		return arg[i + 1]
	end
	return false
end

HTTP_PATH = arg[1] or ".."

port = optionValue("-port") or 8080

f = io.popen("hostname")
hostname = f:read("*l")
f:close()
print(string.format("hostname %s port %d", hostname, port))
if optionValue("-ip") then
	ipaddress = optionValue("-ip")
	hostname = ipaddress
	print("ip address set to", hostname)
else
	ipaddress = '127.0.0.1'
end


ms = socket.tcp()
ms:setoption("reuseaddr", true)
ms:bind(hostname, port)
ipaddress,b = ms:getsockname()

if arg[1] == "-ipf" then
	hostname = ipaddress
end
print(ipaddress, b)

rv = ms:listen(10)
print(rv)

while true do
      print(port, address,HTTP_PATH)
	local socket = ms:accept()
	if socket then
	   print("GOT A CONNECTION")
	end
end

--[[
	@TODO:
	       code to handle a connection
	       perhaps code to fork off a child connection
	       code to handle incoming messages
	       code to send string data to a client
	       code to send binary data to a client
	       perhaps code to do server side encryption
--]]
