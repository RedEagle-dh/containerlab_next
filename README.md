# NextJS Front- & Backend with Embedded CLab Graph

## Config

1. Start docker
```bash
sudo service docker start
```

2. Deploy CLab yml
```bash
sudo clab deploy -t srl02.clab.yml
```

3. Graph the CLab Container
```bash
sudo clab graph --topo srl02.clab.yml --srv ":3002"
```

4. Start Web-App
```bash
npm run dev
```

![alt text](/public/WebsiteScreen.png)