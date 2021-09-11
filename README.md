# LearnWebhookTest-Azure
Webhooks offer a lightweight mechanism for apps to be notified by another service when something of interest happens via an HTTP endpoint. You can use a webhook to trigger an Azure function, and then analyze the message, to determine what happened and how to respond.

Create webhooks in github by going into setting page of repository.
Enter the detatils :
PayloadURL : it should be your azure function in Azure function app. (HTTPTrigger template).
ApplicationType : application/json
secret : get function keys from azure function and update in this field.
select event: all type of event you want to subscribe.(in my case only wiki).
save it. 

Update your azure function(my application - WebhooksConsume) index.js file and updte WebhookConsume.js code into your application code and save it.
Update your wiki repo home page.
go to repo setting > Webhook > select webhook > recent delivery> 
you can see request and paylod and response that was returned from azure function.
